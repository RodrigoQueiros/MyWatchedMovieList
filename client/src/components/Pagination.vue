<template>
  <div class="catalog-pagination-line">
    <div>
      <i
        @click="previous()"
        class="fas fa-arrow-alt-circle-left pagination-icon"
        :style="currentPage==1?{ color: 'grey' }:''"
      ></i>
    </div>
    <div class="pagination-flex">
      <input
        class="paginatin-input"
        type="text"
        v-model="currentPage"
        v-on:keyup.enter="goTo(currentPage)"
      />
      <p class="pagination-text">/{{totalPages}}</p>
    </div>
    <div>
      <i
        @click="next()"
        class="fas fa-arrow-alt-circle-right pagination-icon"
        :style="currentPage==totalPages?{ color: 'grey' }:''"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component({
  mixins: []
})
export default class Pagination extends Vue {
  @Prop({ required: true }) readonly currentPage: number;
  @Prop({ required: true }) readonly totalPages: number;
  @Emit()
  previous() {}
  @Emit()
  goTo(page: string) {}
  @Emit()
  next() {}
}
</script>