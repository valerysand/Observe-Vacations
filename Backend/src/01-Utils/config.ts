abstract class Config {
    public port: number;
    public mySql = { host: "", user: "", password: "", database: "" };
    public loginExpiresIn: string;

}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.port = 3001;
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" }
        this.loginExpiresIn = "3h";
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.port = +process.env.PORT;
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" }
        this.loginExpiresIn = "30m";
    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;