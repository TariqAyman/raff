import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    let url = 'http://localhost:3000/api/payments';
    let payload = JSON.stringify({ userId: '123', amount: 99.99 });
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <YOUR_JWT_HERE>'
        },
    };
    http.post(url, payload, params);
    sleep(1);
}
