import fetch from 'node-fetch';

export async function handler(event, context) {
    const { offset = 0, limit = 4 } = event.queryStringParameters;

    try {
        const response = await fetch(`http://hmel.myartsonline.com/dotnet/php/get_bikes_react.php?offset=${offset}&limit=${limit}`);
        const data = await response.text();

        return {
            statusCode: 200,
            body: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка при получении данных: ' + error.message }),
        };
    }
}
