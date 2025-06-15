<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="user-info">
        <img v-if="user.avatarUrl" :src="'${import.meta.env.VITE_API_BASE_URL}' + user.avatarUrl" alt="Avatar" class="avatar" />
        <h1>👤 {{ user.name || 'Korisnik' }}</h1>
      </div>
      <router-link to="/home" class="home-button">🏠 Početna</router-link>
    </div>

    <div class="grid">
      <div class="card">
        <h2>📄 Osnovni podaci</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Broj omiljenih recepata:</strong> {{ favoriteCount }}</p>
      </div>

      <div class="card">
        <h2>🕵️‍♀️ Aktivnosti</h2>
        <p><strong>Zadnja pretraga:</strong> {{ lastSearch || 'Nema podataka' }}</p>
      </div>

      <div class="card">
        <h2>🔒 Lozinka</h2>
        <button @click="showPasswordChange = !showPasswordChange">
          {{ showPasswordChange ? 'Zatvori' : 'Promijeni lozinku' }}
        </button>
        <div v-if="showPasswordChange" class="form-section">
          <input type="password" v-model="newPassword" placeholder="Nova lozinka" />
          <button @click="changePassword">Spremi</button>
        </div>
      </div>

      <div class="card">
        <h2>🖼️ Profilna slika</h2>
        <button @click="showImageUpload = !showImageUpload">
          {{ showImageUpload ? 'Zatvori' : 'Postavi sliku' }}
        </button>
        <div v-if="showImageUpload" class="form-section">
          <input type="file" @change="handleFileUpload" />
          <button @click="uploadProfilePicture">Pošalji</button>
        </div>
      </div>

      <div class="card danger">
        <h2>⚙️ Račun</h2>
        <button @click="logout">Odjavi se</button>
        <button @click="deleteAccount" class="danger-btn">Obriši račun</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      favoriteCount: 0,
      lastSearch: '',
      newPassword: '',
      selectedImage: null,
      showPasswordChange: false,
      showImageUpload: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem('user-token');
    try {
      const profile = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = profile.data.user;

      const favs = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.favoriteCount = favs.data.count;

      const search = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/search/last`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.lastSearch = search.data.lastSearch;
    } catch (err) {
      console.error('Greška u dohvaćanju profila:', err);
    }
  },
  methods: {
    async changePassword() {
      try {
        const token = localStorage.getItem('user-token');
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/change-password`,
          { newPassword: this.newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
      );
        alert('Lozinka promijenjena');
        this.newPassword = '';
        this.showPasswordChange = false;
      } catch (err) {
        console.error('Greška pri promjeni lozinke:', err);
      }
    },
    handleFileUpload(event) {
      this.selectedImage = event.target.files[0];
    },
    async uploadProfilePicture() {
  if (!this.selectedImage) return;
  const token = localStorage.getItem('user-token');
  const formData = new FormData();
  formData.append('image', this.selectedImage); 

  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/upload-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Slika postavljena!');
    this.showImageUpload = false;
    window.location.reload();
  } catch (err) {
    console.error('Greška pri uploadu slike:', err);
  }
    },
    logout() {
      localStorage.removeItem('user-token');
      this.$router.push('/');
    },
    async deleteAccount() {
      const confirmDelete = confirm('Jeste li sigurni da želite obrisati račun?');
      if (!confirmDelete) return;
      const token = localStorage.getItem('user-token');
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/delete-account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Račun obrisan.');
        localStorage.removeItem('user-token');
        this.$router.push('/');
      } catch (err) {
        console.error('Greška pri brisanju računa:', err);
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 2rem;
  background: #fffefa;
  border-radius: 20px;
  font-family: 'Segoe UI', sans-serif;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e67e22;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
.card {
  background: #fff8f0;
  border: 1px solid #ffdcaa;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}
.card h2 {
  margin-bottom: 1rem;
  color: #d35400;
}
.card p {
  margin: 0.5rem 0;
}
button {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #e67e22;
}
.danger-btn {
  background-color: #e74c3c;
}
.danger-btn:hover {
  background-color: #c0392b;
}
input[type='password'],
input[type='file'] {
  margin-top: 0.8rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.form-section {
  margin-top: 1rem;
}
.home-button {
  background-color: #2ecc71;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}
.home-button:hover {
  background-color: #27ae60;
}
</style>
