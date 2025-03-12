const { Client , Interaction} = require('../models')

class ClientService {
    static async getAllClients() {
        return await Client.findAll();
    }

    static async getClientById(id) {
        return await Client.findByPk(id)
    }

    static async createClient(data) {
        const { name, contact_person, phone, email, address, industry, manager_id } = data;
        return await Client.create({
            name,
            contact_person,
            phone,
            email,
            address,
            industry,
            manager_id,
        });
    }

    static async updateClient(id, data) {
        const client = await Client.findByPk(id);
        if (!client) {
            return null;
        }
        const { name, contact_person, phone, email, address, industry, manager_id } = data;
        await client.update({
            name,
            contact_person,
            phone,
            email,
            address,
            industry,
            manager_id,
        });
        return client;
    }

    static async deleteClient(id) {
        const client = await Client.findByPk(id);
        if (!client) {
            return null;
        }
        await Interaction.destroy({
            where: { client_id: id }
        });

        await client.destroy();
        return client;
    }
}

module.exports = ClientService;
