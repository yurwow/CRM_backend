const ClientService = require('../services/clientService');

class ClientController {
    static async getAll(req, res) {
        try {
            const clients = await ClientService.getAllClients();
            res.json(clients);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    static async getById(req, res) {
        try {
            const client = await ClientService.getClientById(req.params.id);
            res.json(client);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    static async create(req, res) {
        try {
            const newClient = await ClientService.createClient(req.body);
            res.status(201).json(newClient);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    static async update(req, res) {
        try {
            const updateClient = await ClientService.updateClient(req.params.id, req.body);
            if (!updateClient) {
                return res.status(404).json({ error: 'Клиент не найден' });
            }
            res.json(updateClient);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    static async delete(req, res) {
        try {
            const deletedClient = await ClientService.deleteClient(req.params.id);
            if (!deletedClient) {
                return res.status(404).json({ error: 'Клиент не найден' });
            }
            res.json({ message: 'Клиент удалён' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
}

module.exports = ClientController;
