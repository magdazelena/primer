module.exports = {
    beforeFindOne(event) {
        event.params.where = {
            ...event.params.where,
            // statusName: {
            //     published: true
            // }
          };
    },
    beforeFindMany(event) {
      event.params.where = {
        ...event.params.where,
        // statusName: {
        //     published: true
        // }
      };
    },
  };
  