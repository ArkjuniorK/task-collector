<template>
  <div id="register">
    <div
      id="register-child"
      class="mx-5 md:mx-40 md:pt-10 lg:mx-56 xxl:mx-64 xxxl:w-2/5 xxxl:mx-auto"
    >
      <span id="register-title" class="font-sans text-xl font-bold xl:text-2xl"
        >Daftar Sebagai Pengguna Baru</span
      >
      <div id="info" class="mt-6 text-left font-display">
        <div class="flex items-center justify-start">
          <div class="w-3 mr-1 icon">
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"
              />
            </svg>
          </div>
          <span class="text-sm xl:text-base">Petunjuk</span>
        </div>
        <div class="mt-2 downer">
          <span class="font-sans font-bold xl:text-lg"
            >Gunakan Nomor Induk Sekolah diikuti tahun lahir jika tidak memiliki
            nomor induk.</span
          >
        </div>
      </div>
      <form class="mt-6" @submit.prevent="registerUser">
        <div class="form-child xl:grid xl:grid-cols-2 xl:gap-3">
          <div class="right">
            <div id="dropdown-schools" class="relative w-full mb-4">
              <input-form
                @clicked="dropdownSchools = !dropdownSchools"
                v-model="school.name"
                inClass="w-full "
                type="text"
                input="true"
                placeholder="Nama Sekolah"
              >
                <template v-slot:icon>
                  <div class="w-4 cursor-pointer icon">
                    <svg
                      class="w-full h-full fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </template>
              </input-form>
              <div
                v-if="dropdownSchools"
                id="option-form"
                class="absolute z-30 w-full p-3 mt-2 overflow-y-auto text-left border rounded h-screen-50 font-display border-light-300 bg-light-200"
              >
                <span
                  v-for="(school, index) in schools"
                  @click="selectSchool(school.name)"
                  :key="index"
                  class="block w-full p-2 border-b border-light-300"
                  >{{ school.name }}</span
                >
              </div>
            </div>
            <div id="schoolId" class="p-4 mb-4 text-left">
              <span class="font-bold font-display" v-show="school.idNumber"
                >NIPSN Sekolah: {{ school.idNumber }}</span
              >
              <span class="font-bold font-display" v-show="!school.idNumber"
                >Pilih Sekolah Untuk Melihat NIPSN</span
              >
            </div>
            <input-form
              input="true"
              v-model.number="idNumber"
              parClass="mb-4"
              inClass="w-full"
              placeholder="Nomor Induk"
            ></input-form>
            <div id="gender-room" class="mb-4 grid grid-cols-2">
              <div id="room" class="relative mr-2">
                <input-form
                  @clicked="dropdownRoom = !dropdownRoom"
                  v-model="roomIdNumber"
                  input="true"
                  inClass="w-4/5"
                  placeholder="Kelas"
                >
                  <template v-slot:icon>
                    <div class="w-4 cursor-pointer icon">
                      <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </div>
                  </template>
                </input-form>
                <div
                  v-if="dropdownRoom"
                  id="dropdown-room"
                  class="absolute z-20 w-full h-32 p-3 mt-3 overflow-y-auto text-left border rounded bg-light-200 border-light-300 font-display"
                >
                  <span
                    v-for="(room, index) in rooms"
                    @click="selectRoom(room)"
                    :key="index"
                    class="block w-full p-2 border-b border-light-300"
                    >{{ room }}</span
                  >
                </div>
              </div>
              <div id="gender" class="relative">
                <input-form
                  @clicked="dropdownGender = !dropdownGender"
                  v-model="gender"
                  input="true"
                  inClass="w-4/5"
                  placeholder="Jenis Kelamin"
                >
                  <template v-slot:icon>
                    <div class="w-4 cursor-pointer icon">
                      <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </div>
                  </template>
                </input-form>
                <div
                  v-if="dropdownGender"
                  id="dropdown-gender"
                  class="absolute z-20 w-full p-3 mt-3 overflow-y-auto text-left border rounded bg-light-200 border-light-300 font-display"
                >
                  <span
                    v-for="(gender, index) in genders"
                    @click="selectGender(gender)"
                    :key="index"
                    class="block w-full p-2 border-b border-light-300"
                    >{{ gender }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="left">
            <input-form
              v-model="frontName"
              input="true"
              placeholder="Nama Depan"
              parClass="mb-4"
              inClass="w-full"
            ></input-form>
            <input-form
              v-model="backName"
              input="true"
              placeholder="Nama Belakang"
              parClass="mb-4"
              inClass="w-full"
            ></input-form>
            <input-form
              v-model="born"
              input="true"
              placeholder="Tempat, Tanggal Lahir"
              parClass="mb-4"
              inClass="w-full"
            ></input-form>
            <div
              id="register-as"
              class="block p-4 mb-4 text-left border rounded xl:items-center xl:flex xl:justify-between font-display border-light-300"
            >
              <div class="text-lg font-bold title">Daftar Sebagai</div>
              <div class="mt-3 list xl:flex xl:items-center xl:mt-0">
                <label
                  class="relative block pl-8 mb-3 text-base cursor-pointer select-none xl:mr-3 xl:mb-0 label"
                  >Siswa
                  <input
                    type="radio"
                    checked="checked"
                    name="radio"
                    value="Siswa"
                    v-model="registerAs"
                  />
                  <span
                    class="absolute top-0 left-0 w-5 h-5 border rounded-full checkmark hover:bg-light-300 transition duration-200 border-light-300"
                  ></span>
                </label>
                <label
                  class="relative block pl-8 text-base cursor-pointer select-none label"
                  >Guru
                  <input
                    type="radio"
                    name="radio"
                    value="Guru"
                    v-model="registerAs"
                  />
                  <span
                    class="absolute top-0 left-0 w-5 h-5 border rounded-full checkmark border-light-300 hover:bg-light-300 transition duration-200"
                  ></span>
                </label>
              </div>
            </div>
            <div
              class="my-10 btn-action xl:flex xl:justify-between xl:items-center"
            >
              <div class="mb-6 btn xl:flex xl:mb-0 xl:flex-row-reverse">
                <my-btn
                  type="submit"
                  btnClass="p-2 transition duration-500 hover:bg-opacity-75 bg-blue mb-3 xl:mb-0 xl:ml-3"
                  >Daftar
                  <template v-slot:icon>
                    <div class="w-3 ml-2 icon">
                      <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M16.172 9l-6.071-6.071 1.414-1.414L20 10l-.707.707-7.778 7.778-1.414-1.414L16.172 11H0V9z"
                        />
                      </svg>
                    </div>
                  </template>
                </my-btn>
                <my-btn
                  type="button"
                  btnClass="p-2 bg-light-100 transition duration-500 hover:bg-light-200"
                  >Reset</my-btn
                >
              </div>
              <router-link
                to="/login"
                class="text-sm border-b font-display hover:text-dark-300 transition duration-500"
                >Telah Mendaftar?</router-link
              >
            </div>
          </div>
        </div>
      </form>
      <div
        v-show="message"
        id="msg"
        class="p-4 border-2 rounded bg-red bg-opacity-50 border-red transition duration-500 ease-in-out animate"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import AuthServices from '../services/AuthServices'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  components: {
    inputForm: () => import('../components/complements/Input'),
    myBtn: () => import('../components/complements/Button')
  },
  data: () => ({
    /* drodpdown */
    dropdownSchools: false,
    dropdownRoom: false,
    dropdownGender: false,
    /* dropdown instances */
    schools: [],
    rooms: [6, 5, 4, 3, 2, 1],
    genders: ['Laki-laki', 'Perempuan'],
    /* instances data */
    school: {
      name: null,
      idNumber: null
    },
    idNumber: null,
    roomIdNumber: null,
    gender: null,
    frontName: null,
    backName: null,
    born: null,
    registerAs: null,
    /* error and info handling */
    message: null
  }),
  methods: {
    async registerUser() {
      try {
        const formData = {
          idNumber: this.idNumber,
          frontName: this.frontName,
          backName: this.backName,
          born: this.born,
          gender: this.gender,
          roomIdNumber: this.roomIdNumber,
          schoolIdNumber: this.school.idNumber
        }

        /* check empty form */
        const idNumber = formData.idNumber
        const frontName = formData.frontName
        const backName = formData.backName
        const born = formData.born
        const gender = formData.gender
        const roomIdNumber = formData.roomIdNumber
        const schoolIdNumber = formData.schoolIdNumber

        if (
          !idNumber ||
          !frontName ||
          !backName ||
          !born ||
          !gender ||
          !roomIdNumber ||
          !schoolIdNumber
        )
          return (this.message = 'Mohon Untuk Mengisi Kolom Yang Masih Kosong')

        if (!this.registerAs) {
          this.message = 'Mohon untuk memilih status anda yang akan digunakan'
        }

        if (this.registerAs === 'Guru') await this.registerTeacher(formData)
        if (this.registerAs === 'Siswa') await this.registerStudent(formData)

        this.$router.push('/')
      } catch (err) {
        this.message = err.response.data.error
      }
    },
    selectSchool(val) {
      this.schools.filter(field => {
        if (field.name === val) {
          this.school.idNumber = field.idNumber
          this.school.name = field.name
        }
      })
      this.dropdownSchools = false
    },
    selectRoom(val) {
      this.roomIdNumber = val
      this.dropdownRoom = false
    },
    selectGender(val) {
      this.gender = val
      this.dropdownGender = false
    },
    ...mapActions(['registerTeacher', 'registerStudent'])
  },
  async created() {
    this.schools = (await AuthServices.register()).data
  }
}
</script>

<style>
.label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.label input:checked ~ .checkmark {
  background-color: #2196f3;
}
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
.label input:checked ~ .checkmark:after {
  display: block;
}
.label .checkmark:after {
  top: 0.25rem;
  left: 0.25rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
}
.animate {
  animation-name: slideY;
  animation-duration: 1s;
  position: relative;
}
@keyframes slideY {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 100;
  }
}
</style>
