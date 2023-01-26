export const filterClients = (clients, filter) => {
  switch (filter.type) {
    case 'INTERNAL':
      return clients.filter((client) => client.type === 'INTERNAL');
    case 'EXTERNAL':
      return clients.filter((client) => client.type === 'EXTERNAL');
    default:
      return clients;
  }
};

export const getTotalValue = (client) => {
    const total = client.orders.reduce((acc, curr) => acc + curr, 0);

    if (client.type === 'INTERNAL') {
        return total * 0.9
    }

    return total;
  };

export const getTotalValues = (clients) => {
    return clients.reduce((acc, client) => acc + getTotalValue(client), 0)
};
