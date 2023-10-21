const apiClient = {
    baseURL: 'https://my-json-server.typicode.com/LisaHengeveld/real-estate-care',

    async fetchData() {
        return fetch(`${this.baseURL}/db`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        });
    },
};

export default apiClient;