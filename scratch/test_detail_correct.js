
import axios from 'axios';

async function test() {
    try {
        const res = await axios.get('https://www.khs.go.kr/cha/SearchKindOpenapiDt.do', {
            params: { 
                ccbaKdcd: '11', 
                ccbaAsno: '0000010000000', 
                ccbaCtcd: '11' 
            }
        });
        console.log(res.data);
    } catch (e) {
        console.error(e);
    }
}
test();
