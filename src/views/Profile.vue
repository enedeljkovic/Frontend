<template>
  <div class="profile-page">
    <div class="top-bar">
      <h1>👤 InstaRecipe profil</h1>
      <router-link to="/home" class="home-button">🏠 Početna</router-link>
    </div>

    <div class="card">
      <h2>📄 Osnovni podaci</h2>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Korisničko ime:</strong> {{ user.name || 'N/A' }}</p>
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
        {{ showImageUpload ? 'Zatvori' : 'Postavi profilnu sliku' }}
      </button>
      <div v-if="showImageUpload" class="form-section">
        <input type="file" @change="handleFileUpload" />
        <button @click="uploadProfilePicture">Pošalji</button>
      </div>
    </div>

    <div class="card">
      <h2>⚙️ Račun</h2>
      <button @click="logout">Odjavi se</button>
      <button @click="deleteAccount">Obriši račun</button>
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
      const userRes = await axios.get('http://localhost:3001/api/v1/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = userRes.data.user;

      const favRes = await axios.get('http://localhost:3001/api/v1/favorites/count', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.favoriteCount = favRes.data.count;

      const searchRes = await axios.get('http://localhost:3001/api/v1/search/last', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.lastSearch = searchRes.data.lastSearch;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async changePassword() {
      try {
        const token = localStorage.getItem('user-token');
        await axios.post(
          'http://localhost:3001/api/v1/change-password',
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
        await axios.post('http://localhost:3001/api/v1/upload-profile-picture', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Slika postavljena!');
        this.showImageUpload = false;
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
        await axios.delete('http://localhost:3001/api/v1/delete-account', {
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
.profile-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 2rem;
  background: #fffdfa;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  color: #e67e22;
  font-size: 1.8rem;
}

.card {
  background: #fefcf8;
  border: 1px solid #ffe0b2;
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.card h2 {
  margin-bottom: 0.8rem;
  color: #6d4c41;
  font-size: 1.2rem;
}

.card p {
  margin: 0.4rem 0;
}

button {
  margin-top: 0.8rem;
  padding: 0.6rem 1rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #fb8c00;
}

input[type="password"],
input[type="file"] {
  margin-top: 0.6rem;
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.form-section {
  margin-top: 1rem;
}

.home-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
}

.home-button:hover {
  background-color: #369b6d;
}
</style>
