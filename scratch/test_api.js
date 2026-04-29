
import axios from 'axios';

async function test() {
    try {
        const res = await axios.get('https://www.khs.go.kr/cha/SearchKindOpenapiList.do', {
            params: { pageIndex: 1, pageUnit: 5 }
        });
        console.log(res.data);
    } catch (e) {
        console.error(e);
    }
}
test();
