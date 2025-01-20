// Simplified GameScreen.js
export class GameScreen {
  constructor(route, navigation) {
    this.route = route;
    this.navigation = navigation;
    this.theme = {};
    this.words = [];
    this.category = null;
  }

  init() {
    const category = this.route.params.category;
    this.category = category;
    this.theme = mockData.categoryThemes[category];
    this.words = mockData.categories[category];
  }

  checkAnswer(guess) {
    return {
      correct: this.words.includes(guess),
      streak: this.words.includes(guess) ? 3 : 0,
    };
  }

  changeCategory() {
    this.navigation.goBack();
  }
}
