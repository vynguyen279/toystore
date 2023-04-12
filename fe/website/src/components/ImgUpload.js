export default function uploadImg(file, anh) {
    // var file = document.getElementById('input_img').files[0];
    var form = new FormData();
    form.append('image', file);
    return fetch(
      'https://api.imgbb.com/1/upload?key=4c4909ed144cd9ff41bd9bb2d2aa7fbb',
      {
        method: 'POST',
        mode: 'no-cors',
        mimeType: 'multipart/form-data',
        contentType: false,
        body: form,
      }
    )
    //   .then((res) => {
    //     return res.json();
    //   })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }