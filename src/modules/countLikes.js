class Likes {
    constructor() {
      this.URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/11vENfOR5glhZClk75LH/likes';
    }
  
    async getLikes() {
      const res = await fetch(this.URL);
      const data = await res.text();
      if (data === '') {
        return [];
      }
      return JSON.parse(data);
    }
  
    async displayLikes() {
      const likesNum = document.querySelectorAll('.num');
      const likes = await this.getLikes();
      likes.forEach((ele) => {
        likesNum[ele.item_id - 1].innerHTML = ele.likes;
      });
    }
  
    async addLike(id) {
      fetch(this.URL, {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    }
  
    async activateLikeBtns() {
      const likeBtns = document.querySelectorAll('.heart');
      const likesNum = document.querySelectorAll('.num');
      likeBtns.forEach((ele, id) => {
        ele.addEventListener('click', () => {
          this.addLike(id + 1);
          likesNum[id].innerHTML = likesNum[id].innerHTML * 1 + 1;
        });
      });
    }
  }
  const likes = new Likes();
  
  export default likes;