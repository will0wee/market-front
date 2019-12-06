const baseUrl = "http://localhost:3012/user";

class UserService 
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
        let call = await fetch(`${baseUrl}s`, init);
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
        let call = await fetch(`${baseUrl}/get/${id}`, init);
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
        let call = await fetch(`${baseUrl}/create`, init);
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
        let call = await fetch(`${baseUrl}/update/${id}`, init);
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
        let call = await fetch(`${baseUrl}/delete/${id}`, init);
        return call;
    }
    
    static async connection(body)
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
        let call = await fetch(`${baseUrl}/connection`, init);
        return call;
    }
	
    static async getProducers()
    {
        let init = 
        {
            method: "GET", 
            headers: 
            {
                "Content-Type": "application/json"
            }
        }
        let call = await fetch(`${baseUrl}/getProducers`, init);
        return call;
    }
    
}

export default UserService;