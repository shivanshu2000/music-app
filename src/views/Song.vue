<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center z-10">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-10 h-24 w-24 text-3xl bg-white text-black rounded-full
        focus:outline-none"
        @click.prevent="newSong(song)"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl z-1 font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>

  <section id="comments" class="container mx-auto mt-6 ">
    <div class="bg-white mb-6 relative flex flex-col blocks">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title text-white"
          >Comments {{ song.comment_count }}</span
        >
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          v-if="comment_show_alert"
          :class="comment_alert_variant"
        >
          {{ comment_alert_message }}
        </div>
        <VeeForm
          v-if="userLoggedIn"
          :validation-schema="schema"
          @submit="addComment"
        >
          <VeeField
            as="textarea"
            name="comment"
            class="block blocks w-full py-1.5 px-3 transition
              duration-500 focus:outline-none focus:border-white text-white rounded mb-4"
            placeholder="Your comment here..."
          ></VeeField>
          <ErrorMessage class="text-red-600" name="comment" />
          <button
            :disabled="comment_in_submission"
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
          >
            Submit
          </button>
        </VeeForm>
        <!-- Sort Comments -->
        <select
          v-model="sort"
          class="block blocks text-white mt-4 py-1.5 px-3 transition
          duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>

  <ul class="container mx-auto ">
    <li
      v-for="comment in sortedComments"
      :key="comment.docId"
      class="p-6 bg-gray-50 text-white m-1 blocks"
    >
      <!-- Comment Author -->
      <div class="mb-5 ">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  songsCollection,
  auth,
  commentsCollection,
} from '../includes/firebase';

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted',
      comments: [],
      sort: '1',
    };
  },

  computed: {
    ...mapState(['userLoggedIn']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },

  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({ name: 'home' });
      return;
    }

    const { sort } = this.$route.query;

    this.sort = sort === '1' || sort === '2' ? sort : '1';
    this.song = docSnapshot.data();

    this.getComments();
  },

  methods: {
    ...mapActions(['newSong']),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = 'bg-blue-500';
      // eslint-disable-next-line operator-linebreak
      this.comment_alert_message =
        'Please wait! Your comment is being submitted';

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sId: this.$route.params.id,
        name: auth.currentUser.displayName,
        uId: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.song.comment_count += 1;

      await songsCollection
        .doc(this.$route.params.id)
        .update({ comment_count: this.song.comment_count });

      this.getComments();
      this.comment_in_submission = false;
      this.comment_alert_variant = 'bg-green-500';
      this.comment_alert_message = 'Comment added!';
      resetForm();
    },

    async getComments() {
      const snapshots = await commentsCollection
        .where('sId', '==', this.$route.params.id)
        .get();
      this.comments = [];

      snapshots.forEach((comment) => {
        this.comments.push({ ...comment.data(), docId: comment.id });
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
