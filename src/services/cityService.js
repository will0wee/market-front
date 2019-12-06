const baseUrl = "http://localhost:3012/";

class CityService 
{
    static async list()
    {
        let init = 
        {
            method: "GET", 
            headers: 
            {
                "Content-Type": "application/json"
            }
        };
        let call = await fetch(`${baseUrl}cities`, init);
        return call;
    }
	
    static async details(id)
    {
        let init = 
        {
            method: "GET", 
            headers: 
            {
                "Content-Type": "application/json"
            }
        }
        let call = await fetch(`${baseUrl}city/get/${id}`, init);
        return call;
    }
	
    static async create(body)
    {
        let init = 
        {
            method: "POST", 
            headers: 
            {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}city/create`, init);
        return call;
    }
	
    static async update(id, body)
    {
        let init = 
        {
            method: "PUT", 
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}city/update/${id}`, init);
        return call;
    }
	
    static async delete(id)
    {
        let init = 
        {
            method: "DELETE", 
            headers: 
            {
                "Content-Type": "application/json"
            }
        }
        let call = await fetch(`${baseUrl}city/delete/${id}`, init);
        return call;
    }
}

export default CityService;