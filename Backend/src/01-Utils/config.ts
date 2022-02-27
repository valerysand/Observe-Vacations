abstract class Config {
    public port: number;
    public loginExpiresIn: string;
    public mySql = { host: "", user: "", password: "", database: "" };

}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "3h";
        this.port = 3001;
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" }
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "30m";
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" }
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;