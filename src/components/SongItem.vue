<template>
  <li
    class="flex item__song justify-between items-center p-3 pl-6 cursor-pointer"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docId } }"
        class="font-bold text-white block"
        >{{ song.modified_name }}</router-link
      >
      <span class="text-sm text-white">{{ song.display_name }}</span>
    </div>

    <div class="text-white text-lg">
      <span class="comments">
        <i class="fa fa-comments text-white"></i>
        {{ song.comment_count }}
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['song'],
};
</script>
