// el post y delete deben MOSTRAR por log que se creo o borro el producto sin haberlo creado o borrado (de mentira) a traves de un argv.
// participar en la clase del martes para ver como se realizan los cmd

//un post "simulado", devera devolver por consola que se realizo o no con exito


async function POST(productTitle, productPrice, productCategory) {
    try{
        const product = { title: productTitle, price: productPrice, category: productCategory};
        const response = await fetch('https://fakestoreapi.com/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(product)
                        });
        console.log("Producto agregado:");
        console.log(await response.json());
    }catch(error){
        console.log("Error al agregar producto");
    }
}
//deve enviar peticion para eliminar el producto y devolver por consola la respuesta
async function DELETE(productid){
    try{
        const response = await fetch('https://fakestoreapi.com/products/' + productid, {
                        method: 'DELETE'
                        })
        const data = await response.json()
        if(data == null || data.title == undefined){
            console.log("No se encontro el producto")
        }else{
            console.log("Producto eliminado: "+data.title+"\n");
        }
        
    }catch(error){
        console.log(error);
    }
}


// GET products deberia devolver lista de productos completa en cosola
// GET products/<productid> deberia devolver el producto solicitado en consola
async function GET(productid){
    try{
        if(productid==null){
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            //console.log(data);
            let i = 0;
            while(data[i] !== undefined && data[i].title !== undefined){
                if(i == 0){
                    console.log("ID".padEnd(5) +
                                "PRODUCTO".padEnd(120) +
                                "CATEGORIA".padEnd(20) +
                                "PRECIO".padEnd(12) +
                                "RATING".padEnd(10) +
                                "CALIFICACIONES".padEnd(10)
                            );
                        }
                console.log(String(data[i].id).padEnd(5) +
                            data[i].title.padEnd(120) +
                            data[i].category.padEnd(20) +
                            String(data[i].price).padEnd(12) +
                            String(data[i].rating.rate).padEnd(10) +
                            String(data[i].rating.count).padEnd(10)
                        );
                i++;
            }
        }else{
            const response = await fetch("https://fakestoreapi.com/products/" + productid);
            const data = await response.json();
            //console.log(data);
            console.log("ID: ".padEnd(18) + data.id);
            console.log("PRODUCTO: ".padEnd(18) + data.title);
            console.log("CATEGORIA: ".padEnd(18) + data.category);
            console.log("PRECIO: ".padEnd(18) + data.price);
            console.log("RATING: ".padEnd(18) + data.rating.rate);
            console.log("CALIFICACIONES: ".padEnd(18) + data.rating.count);
            console.log("IMAGEN (link): ".padEnd(18) + data.image);
            console.log("DESCRIPCION: ".padEnd(18) + data.description);
        }
        
    }catch(error){
        console.log("Error al obtener producto");
    }
}

async function main() {
    try{
    const args = process.argv.slice(2);
        switch(args[0]){
            case "GET":
                if(args[1] == "products"){
                    await GET(null);
                }else{
                    if(args[1].startsWith("products/")){
                        await GET(args[1].replace("products/", ""));
                    }else{
                        console.log("ERROR: Comando no reconocido");
                        break
                    }
                }
                break;
            case "POST":
                await POST(args[2], args[3], args[4]);
                break;
            case "DELETE":
                if(args[1].startsWith("products/")){
                        await DELETE(args[1].replace("products/", ""));
                    }else{
                        console.log("ERROR: Comando no reconocido");
                        break
                    }
                break;
            default:
                console.log("ERROR: Comando no reconocido");
        }
    }catch(error){
        console.log("Error al ejecutar comando");
    }finally{
        console.log("Conexion cerrada")
    }
    
}

main();