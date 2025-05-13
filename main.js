// Produk makanan:
const produk_a1 = document.getElementById('menua1');
const jumlah_a1 = document.getElementById('jumlaha1');
const harga_a1 = 13000;

const produk_a2 = document.getElementById('menua2');
const jumlah_a2 = document.getElementById('jumlaha2');
const harga_a2 = 13000;

const produk_a3 = document.getElementById('menua3');
const jumlah_a3 = document.getElementById('jumlaha3');
const harga_a3 = 13000;


// Produk minuman:
const produk_b1 = document.getElementById('menub1');
const jumlah_b1 = document.getElementById('jumlahb1');
const harga_b1 = 4000;


function toggleOn(selectedElement) {
    selectedElement.disabled = false;
    selectedElement.required = true;
    selectedElement.ariaRequired = true;
    selectedElement.value = 1;
}

function toggleOff(selectedElement) {
    selectedElement.disabled = true;
    selectedElement.required = false;
    selectedElement.ariaRequired = false;
    selectedElement.value = '';
}

function updatePrice() {
    const a1 = document.getElementById('jumlaha1').value;
    const a2 = document.getElementById('jumlaha2').value;
    const a3 = document.getElementById('jumlaha3').value;
    const b1 = document.getElementById('jumlahb1').value;

    const a = (harga_a1 * a1);
    const b = (harga_a2 * a2);
    const c = (harga_a3 * a3);
    const d = (harga_b1 * b1);
    const totalPrice = a + b + c + d;
    // document.getElementById('total-harga').textContent = totalPrice;
    const rupiahConvert = (number) => {
        return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    document.getElementById('total-harga').textContent = rupiahConvert(totalPrice) + ',00';
}

//
produk_a1.addEventListener('change', function() {
    if (this.checked) {
        toggleOn(jumlah_a1);
    } else {
        toggleOff(jumlah_a1);
    }
    updatePrice();
});

jumlah_a1.addEventListener('change', function() {
    updatePrice();
});

produk_a2.addEventListener('change', function() {
    if (this.checked) {
        toggleOn(jumlah_a2);
    } else {
        toggleOff(jumlah_a2);
    }
    updatePrice();
});

jumlah_a2.addEventListener('change', function() {
    updatePrice();
});

produk_a3.addEventListener('change', function() {
    if (this.checked) {
        toggleOn(jumlah_a3);
    } else {
        toggleOff(jumlah_a3);
    }
    updatePrice();
});

jumlah_a3.addEventListener('change', function() {
    updatePrice();
});

produk_b1.addEventListener('change', function() {
    if (this.checked) {
        toggleOn(jumlah_b1);
    } else {
        toggleOff(jumlah_b1);
    }
    updatePrice();
});

jumlah_b1.addEventListener('change', function() {
    updatePrice();
});

// Form
// const form = document.getElementById('submit-form');
// const script = '';

// form.addEventListener('submit', e => {
//     e.preventDefault();

//     const fileInput = document.getElementById('buktitransfer');
//     const file = fileInput.files[0];

//     if (!file) {
//         alert('Tidak ada bukti pembayaran!');
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function () {
//         const base64File = reader.result.split(',')[1];
//         const formData = {
//             name: form.namaPemesan.value,
//             a1: form.jumlaha1.value,
//             a2: form.jumlaha2.value,
//             a3: form.jumlaha3.value,
//             b1: form.jumlahb1.value,
//             total: document.getElementById('total-harga').textContent,
//             // trans: document.getElementById('buktitransfer').value
//             fileName: file.name,
//             mimeType: file.type,
//             fileData: base64File
//         };

//         fetch(script, {
//             method: 'POST',
//             body: JSON.stringify(formData),
//             headers: { 'Content-Type' : 'application/json' },
//             mode: 'no-cors'
//         })
//         .then(() => alert('Form submitted successfully!'))
//         .catch(error => alert('Error: ' + error.message));
//     };
//     reader.readAsDataURL(file);
// });

const form = document.getElementById('submit-form');
const scriptUrl = 'https://script.google.com/macros/s/AKfycbz2M-3rcLOso4ZMaXUQ7QOoanw2iH_ggsKrtCxk17vFDrglh9fd12Jq4RHbRqMcK12lvw/exec';

function generateSecurityToken() {
  const timestamp = new Date().getTime();
  const currentOrigin = window.location.origin + window.location.pathname;

  return {
    timestamp: timestamp,
    origin: currentOrigin
  };
}

form.addEventListener('submit', e => {
    e.preventDefault();
    loader();

    const nama = form.namaPemesan.value;
    if (nama == null || nama == '') {
        unloader();
        alert('GAGAL UNTUK MELAKUKAN PEMESANAN!\n\nStatus Kesalahan: Mohon untuk mencantumkan nama pemesan.');
        return;
    }
    
    if (document.getElementById('total-harga').textContent === "Rp0,00") {
        unloader();
        alert('GAGAL UNTUK MELAKUKAN PEMESANAN!\n\nStatus Kesalahan: Mohon untuk memesan setidaknya satu menu.');
        return;
    }

    // Show loading indicator
    const fileInput = document.getElementById('buktitransfer');
    const file = fileInput.files[0];
    
    if (!file) {
        unloader();
        alert('GAGAL UNTUK MELAKUKAN PEMESANAN!\nStatus Kesalahan: Mohon untuk mencantumkan bukti pembayaran.');
        return;
    }
    
    const securityInfo = generateSecurityToken();
    const reader = new FileReader();

    reader.onload = function () {
        const base64File = reader.result.split(',')[1];
        const formData = {
            // Form data
            name: form.namaPemesan.value,
            a1: form.jumlaha1.value,
            a2: form.jumlaha2.value,
            a3: form.jumlaha3.value,
            b1: form.jumlahb1.value,
            total: document.getElementById('total-harga').textContent,
            
            // File data
            fileName: file.name,
            mimeType: file.type,
            fileData: base64File,
            
            // Security information
            timestamp: securityInfo.timestamp,
            referer: securityInfo.origin
        };
        clearForm();
        fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors'
        })
        .then(() => {
            // Success handling
            unloader();
            alert('BERHASIL UNTUK MELAKUKAN PEMESANAN!\nStatus Keberhasilan: Form berhasil dikirim, terima kasih atas pesanan anda!\nDitunggu pesanan berikutnya :)');
            
            // Optional: Reset form
            // form.reset();
            // document.getElementById('total-harga').textContent = 'Rp0,00';
        })
        .catch(error => {
            // Error handling
            unloader();
            alert('GAGAL UNTUK MELAKUKAN PEMESANAN!\n\nStatus Kesalahan: ' + (error.message || 'Terjadi kesalahan saat mengirim formulir'));
        });
    };
    
    reader.onerror = function() {
        unloader();
        alert('Error membaca file. Silakan coba lagi.');
    };
    
    reader.readAsDataURL(file);
});

const v = document.getElementById('loading');
function loader() {
    v.style.display = 'flex';
}

function unloader() {
    v.style.display = 'none';
}

function clearForm() {
    form.reset();
    document.getElementById('namaPemesan').value = '';

    document.getElementById('menua1').value = false;
    document.getElementById('jumlaha1').value = '';
    document.getElementById('jumlaha1').disabled = true;

    document.getElementById('menua2').value = false;
    document.getElementById('jumlaha2').value = '';
    document.getElementById('jumlaha2').disabled = true;

    document.getElementById('menua3').value = false;
    document.getElementById('jumlaha3').value = '';
    document.getElementById('jumlaha3').disabled = true;

    document.getElementById('menub1').value = false;
    document.getElementById('jumlahb1').value = '';
    document.getElementById('jumlahb1').disabled = true;

    // document.getElementById('total-harga').textContent = 'Rp0,00';
    updatePrice();
}

jumlah_a1.addEventListener('input', function() {
    updatePrice();
});

jumlah_a2.addEventListener('input', function() {
    updatePrice();
});

jumlah_a3.addEventListener('input', function() {
    updatePrice();
});

jumlah_b1.addEventListener('input', function() {
    updatePrice();
});