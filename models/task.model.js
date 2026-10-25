const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define('task', {
    task_order: {
        type: DataTypes.INTEGER
    },
    task_name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    finished: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.STRING
    }
}, {
    tableName: "task",
    timestamps: false
})

module.exports = Task;