class SomeClass {
  #title; // private field

  // private function
  get #getTitle() {
    return this.#title;
  }

  // static function
  static test() {
    console.log('static test');
  }
}

SomeClass.test();