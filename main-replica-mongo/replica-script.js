rs.initiate({
    _id: "rsmongo",
    members: [
        { _id: 0, host: "mongo_host:30004" },
        { _id: 1, host: "mongo_primary:30001" },
        { _id: 2, host: "mongo_secondary:30002" },
        { _id: 3, host: "mongo_arbiter:30003" },
    ],
});