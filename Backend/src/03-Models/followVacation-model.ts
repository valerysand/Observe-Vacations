class FollowVacation {
    userId: number;
    vacationId: number;

    public constructor(vacation: FollowVacation) {
        this.userId = vacation.userId;
        this.vacationId = vacation.vacationId;
    }
}

export default FollowVacation;