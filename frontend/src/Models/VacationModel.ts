class VacationModel {
    public vacationId: number;
    public vacationName: string;
    public vacationDescription: string;
    public vacationImage: string;   //Backend return imageName to Frontend
    public fromDate: string;
    public toDate: string;
    public vacationPrice: number;
    public image: FileList;
}

export default VacationModel;