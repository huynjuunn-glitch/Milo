
import axios from 'axios';

async function test() {
    try {
        const res = await axios.get('https://www.khs.go.kr/cha/SearchImageOpenapi.do', {
            params: { 
                ccbaKdcd: '11', 
                ccbaAsno: '0000010000000', 
                ccbaCtcd: '11' 
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        console.log(res.data);
    } catch (e) {
        console.error(e);
    }
}
test();
