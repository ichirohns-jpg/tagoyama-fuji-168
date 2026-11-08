(function(){
  const files={"1g2xT7t3EQg9h5Y4kj290-wkElTBx4nMi":"assets/certificates/summit-01.jpg","1RuLwhFOdre-5PckyqrJGak6LNlT3q8MZ":"assets/certificates/summit-02.jpg","1eiBLe3pSOvGBZZ5k_tx7YJ_cTfbGnTQe":"assets/certificates/summit-03.jpg","1hnpoLXBMxawmHArQwcvcKFRAIg8zwMhB":"assets/certificates/summit-04.jpg","13An2b0qhU6FCp9n_qI7duKrVTmuzqh_v":"assets/certificates/summit-05.jpg","1btZDGpbG7Jzg2eOP3_LAR4qEghZs9Tj1":"assets/certificates/summit-06.jpg","1pTF5RPdBoLEhiXQ3CJ0PBckBB5ucX36O":"assets/certificates/summit-07.jpg","1JADGqhsInwu8zXH9rF8e04Kf3-QUYw1w":"assets/certificates/summit-08.jpg","1uTq31Awkxa51psQvzVmCebyz3meW2dNK":"assets/certificates/summit-09.jpg","1lFvxFjkoh0qn4W5t4LNd4gSaby-zEhdJ":"assets/certificates/summit-10.jpg","1B9hi_pE50XEAdiEYEvGGyTm6vhqGoZHg":"assets/certificates/summit-12.jpg"};
  const byCount={"1":"assets/certificates/summit-01.jpg","2":"assets/certificates/summit-02.jpg","3":"assets/certificates/summit-03.jpg","4":"assets/certificates/summit-04.jpg","5":"assets/certificates/summit-05.jpg","6":"assets/certificates/summit-06.jpg","7":"assets/certificates/summit-07.jpg","8":"assets/certificates/summit-08.jpg","9":"assets/certificates/summit-09.jpg","10":"assets/certificates/summit-10.jpg","11":"assets/certificates/summit-11.jpg","12":"assets/certificates/summit-12.jpg"};
  function resolve(value,count){
    const text=String(value||'').trim();
    const match=text.match(/[?&]id=([^&#]+)/)||text.match(/\/(?:file\/)?d\/([^/?=&#]+)/);
    const relative=match&&files[match[1]]?files[match[1]]:(!text?byCount[Number(count)]:null);
    return relative?new URL(relative,location.href).href:text;
  }
  window.TagoyamaCertificateAssets={resolve};
})();

