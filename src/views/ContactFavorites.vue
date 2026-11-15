<template>
    <div class="page row">
        <div class="mt-3 col-md-6">
            <h4>
                Liên hệ yêu thích
                <i class="fas fa-heart text-danger"></i>
            </h4>
            <ContactList
                v-if="favorites.length > 0"
                :contacts="favorites"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ yêu thích nào.</p>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiết Liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact" />
                <router-link
                    :to="{
                        name: 'contact.edit',
                        params: { id: activeContact._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactCard,
        ContactList,
    },
    data() {
        return {
            favorites: [],
            activeIndex: -1,
        };
    },
    computed: {
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.favorites[this.activeIndex];
        },
    },
    methods: {
        async retrieveFavorites() {
            try {
                this.favorites = await ContactService.getFavorite();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveFavorites();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>