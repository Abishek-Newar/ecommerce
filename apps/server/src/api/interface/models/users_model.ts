import { QueryTypes } from "sequelize";
import { sequelize } from "../../config/db";

export async function UserSignupData(where: any, callback: any) {
    try {
      let Query = "INSERT INTO login_users (username, email, password) VALUES (:username, :email, :password)";
  
      let executeQuery = await sequelize.query(Query, {
        raw: true,
        type: QueryTypes.INSERT,
        replacements: where,
      });
      callback(null, executeQuery);
    } catch (error: any) {
      callback(error, null);
      throw new Error(error);
    }
  }