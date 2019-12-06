const baseUrl = "http://localhost:3012/";

class CategoryService 
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
        let call = await fetch(`${baseUrl}categories`, init);
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
        let call = await fetch(`${baseUrl}category/get/${id}`, init);
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
        let call = await fetch(`${baseUrl}category/create`, init);
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
        let call = await fetch(`${baseUrl}category/update/${id}`, init);
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
        let call = await fetch(`${baseUrl}category/delete/${id}`, init);
        return call;
    }
}

export default CategoryService;