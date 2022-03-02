class FollowModel {
    userId: number;
    vacationId: number;

    public constructor(userId: number, vacationId: number) {
        this.userId = userId;
        this.vacationId = vacationId;
    }
}

export default FollowModel;