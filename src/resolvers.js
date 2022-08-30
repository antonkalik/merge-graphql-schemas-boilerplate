const data = {
  id: 4838745,
  value: 'Some random string',
};

const Query = {
  getDataExample: () => {
    return data;
  },
};

const Mutation = {
  updateData: (_, { value }) => {
    return {
      ...data,
      value,
    };
  },
};

module.exports = {
  Query,
  Mutation,
};
