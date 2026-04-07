
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: './db/Timesheet.db',
    logging: true, 
}
);

export default sequelize;