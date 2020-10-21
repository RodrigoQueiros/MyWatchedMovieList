<template>
  <div class="footer">
    <div class="container">
      <div class="footer-flex">
        <div class="footer-media">
          <div>
            <img class="footer-image" src="../assets/footer-photo.png" alt />
          </div>
          <div class="footer-developer">
            <p class="footer-developer-name">
              My name is
              <b class="color-yellow">Rodrigo Queirós</b>
              and I am 22 years old. I recently
              completed a degree in Web
              Development with distinction and I
              am currently looking for my first
              job in the front-end
              development field.
              I am an extrovert person who has
              been passionate about technology
              and its evolution since childhood.
              As a result, I’ve become highly
              movitated and focused to learn
              more and improve in this field.
            </p>
          </div>
        </div>
        <div class="footer-contact">
          <a
            class="footer-link"
            href="https://www.linkedin.com/in/rodrigo-queiros/"
            target="_blank"
          >
            <i class="fab fa-linkedin footer-icon"></i>
            <p class="footer-link-text">Linkedin</p>
          </a>
          <a
            class="footer-link"
            href="https://github.com/RodrigoQueiros?tab=repositories"
            target="_blank"
          >
            <i class="fab fa-github footer-icon"></i>
            <p class="footer-link-text">Github (Portfolio)</p>
          </a>
          <a
            class="footer-link"
            href="https://drive.google.com/file/d/1ryxKcFKPWqm_pi5YtBsmceWMrR6lwQGj/view?usp=sharing"
            target="_blank"
          >
            <i class="fas fa-file-pdf footer-icon"></i>
            <p class="footer-link-text">Curriculum</p>
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-link-text">
          <a href="mailto:rodrigoqueiros.nl@gmail.com" target="_blank">rodrigoqueiros.nl@gmail.com</a> ●
          <a @click="goToPage('Sitemap')">Sitemap</a> ●
          <a href="https://www.themoviedb.org/" target="_blank">TheMovieDB</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  @Prop() private msg!: string;
  public goToPage(page: string): void {
    this.$router.push({ name: page });
  }
}
</script>

