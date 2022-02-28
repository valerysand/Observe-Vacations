class FollowModel {
    userId: number;
    vacationId: number;

    public constructor(vacation: FollowModel) {
        this.userId = vacation.userId;
        this.vacationId = vacation.vacationId;
    }
}

export default FollowModel;