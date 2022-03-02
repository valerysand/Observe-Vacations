abstract class Config {
    public urls = {
        vacations: "",
        followedVacations: "",
        vacationsImages: "",
        register: "",
        login: "",
        addFollow: "",
        removeFollow: "",
        socketServer: ""
    }

    public constructor(baseUrl: string) {
        this.urls = {
            vacations: baseUrl + "vacations/",
            followedVacations: baseUrl + "vacations/followed/",
            vacationsImages: baseUrl + "vacations/images/",
            register: baseUrl + "auth/register/",
            login: baseUrl + "auth/login/",
            addFollow: baseUrl + "follows/add/",
            removeFollow: baseUrl + "follows/remove/",
            socketServer: "http://localhost:3002"
        }
    }
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3002/api/");
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;