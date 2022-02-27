abstract class Config {
    public urls = {
        vacations: "",
        vacationsImages: "",
        register: "",
        login: "",
        followVacation: "",
        unfollowVacation: "",
        socketServer: ""
    }

    public constructor(baseUrl: string) {
        this.urls = {
            vacations: baseUrl + "vacations/",
            vacationsImages: baseUrl + "vacations/images/",
            register: baseUrl + "auth/register/",
            login: baseUrl + "auth/login/",
            followVacation: baseUrl + "vacations/follows/",
            unfollowVacation: baseUrl + "vacations/follows/delete/",
            socketServer: "http://localhost:3001"
        }
    }
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;