
import axios from 'axios';

async function test() {
    try {
        const res = await axios.get('https://www.khs.go.kr/cha/SearchImageOpenapi.do', {
            params: { ccbaKdcd: '11', ccbaAsno: '00010000', ccbaCtcd: '11' }
        });
        console.log(res.data);
    } catch (e) {
        console.error(e);
    }
}
test();
