 
export type Status = "Ok" | "Error"

export type ApiResponse = 
{
    status : Status,
    message : string,
    datos : any
}