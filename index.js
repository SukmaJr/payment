<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Payment Page</title>
  <style>
    body {
      margin: 0;
      font-family: 'Trebuchet MS', sans-serif;
      color: #fff;
      background: linear-gradient(135deg, #0f0f2d, #1b003a);
      text-align: center;
    }
    header {
      padding: 10px;
      background: rgba(0,0,0,0.6);
      font-size: 14px;
    }

    /* Intro */
    #intro {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    #intro h1 { font-size: 28px; color: cyan; }
    #intro p { font-size: 14px; margin-bottom: 20px; }
    #intro button {
      padding: 12px 24px;
      background: cyan;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      color: #000;
    }

    /* Payment */
    #payment {
      padding: 20px;
      display: none;
    }
    .profile img {
      width: 100px;
      border-radius: 50%;
      border: 3px solid cyan;
      margin: 20px 0;
    }
    .button {
      display: block;
      width: 80%;
      margin: 10px auto;
      padding: 15px;
      background: rgba(0,255,255,0.1);
      border: 2px solid cyan;
      border-radius: 12px;
      font-size: 16px;
      cursor: pointer;
      transition: 0.2s;
      color: white;
    }
    .button:hover { background: rgba(0,255,255,0.3); }

    /* Modal */
    .modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.8);
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: #111;
      padding: 20px;
      border-radius: 12px;
      border: 2px solid cyan;
      max-width: 300px;
    }
    .copy-btn {
      margin-top: 10px;
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      background: cyan;
      color: black;
      cursor: pointer;
    }

    /* Footer Sosial Media */
    footer {
      margin-top: 20px;
    }
    footer .socials {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 10px;
    }
    footer .socials a img {
      width: 30px;
      height: 30px;
      filter: drop-shadow(0 0 5px cyan);
    }
  </style>
</head>
<body>
  <!-- Intro Page -->
  <div id="intro">
    <h1>Yow,Sukma di sini😜🤙</h1>
    <p>Selamat datang di website paymentku, harap ss bukti tf ya agar tidak ada masalah, makasih😊.</p>
    <button id="goPayment">Go to Payment</button>
  </div>

  <!-- Payment Page -->
  <div id="payment">
    <header id="datetime"></header>
    <div class="profile">
      <img id="profileImg" src="" alt="Profile">
      <h2>Metode Pembayaran</h2>
    </div>
    <button class="button" onclick="showQris()">QRIS</button>
    <button class="button" onclick="showDetail('dana')">Dana</button>
    <button class="button" onclick="showDetail('gopay')">Gopay</button>
    <button class="button" onclick="showDetail('shopeepay')">ShopeePay</button>

    <footer>
      <p>Sosial Media Admin</p>
      <div class="socials">
        <a href="https://wa.me/6282266888892" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WA">
        </a>
        <a href="https://www.instagram.com/sukmaplengerr?igsh=MTV2MGs3ZndiYTJwNg==" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="IG">
        </a>
        <a href="https://tiktok.com/@sukma_bejirr" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok">
        </a>
        <a href="https://www.youtube.com/@voltchici.8085" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube">
        </a>
      </div>
    </footer>
  </div>

  <!-- Modal -->
  <div id="modal" class="modal">
    <div class="modal-content" id="modalContent"></div>
  </div>

  <!-- Musik -->
  <audio autoplay loop hidden>
    <source src="musik.mp3" type="audio/mpeg">
  </audio>

  <script>
    let data = {};
    fetch('gambar.json')
      .then(res => res.json())
      .then(json => {
        data = json;
        document.getElementById("profileImg").src = data.profile;
      });

    // tombol intro
    document.getElementById("goPayment").addEventListener("click", () => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("payment").style.display = "block";
    });

    function showQris() {
  document.getElementById("modalContent").innerHTML = `
    <h3>Scan QRIS</h3>
    <img src="${data.qris}" width="200">
    <br>
    <a href="${data.qris}" download="qris.png">
      <button class="copy-btn">Save QRIS</button>
    </a>
    <button onclick="closeModal()" class="copy-btn">Tutup</button>
  `;
  document.getElementById("modal").style.display = "flex";
}

    function showDetail(method) {
      const m = data[method];
      document.getElementById("modalContent").innerHTML = `
        <h3>${method.toUpperCase()}</h3>
        <p>Nama: ${m.nama}</p>
        <p>Nomor: <span id="nomor">${m.nomor}</span></p>
        <button class="copy-btn" onclick="copyNomor('${m.nomor}')">Copy</button>
        <button class="copy-btn" onclick="closeModal()">Tutup</button>
      `;
      document.getElementById("modal").style.display = "flex";
    }

    function closeModal() {
      document.getElementById("modal").style.display = "none";
    }

    function copyNomor(nomor) {
      navigator.clipboard.writeText(nomor);
      alert("Nomor disalin: " + nomor);
    }

    function updateTime() {
      const now = new Date();
      const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
      const tanggal = now.toLocaleDateString('id-ID');
      const jam = now.toLocaleTimeString('id-ID');
      document.getElementById("datetime").textContent = `${hari}, ${tanggal} - ${jam}`;
    }
    setInterval(updateTime, 1000);
    updateTime();
  </script>
</body>
</html>