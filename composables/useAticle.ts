import { Aticle } from "~/types";

async function getAllAticle(): Promise<Aticle[]> {
    const data = await queryContent().find() as any;
    console.log(data);

    // 获得年
    return parse(data);
}

function parse(arry: Aticle[]) {
    arry.forEach(element => {
        element.date = useDayjs(element.date as Date);
    });
    return arry
}

async function regfindByName(name: string) {
    const reg = '/' + name + '/'
    return await queryContent().where({ name: { $regex: reg } }).find()
}

async function findAticlesByYears(years: string[]) {
    const data = await queryContent().where({ _dir: { $in: years } }).find() as any
    return parse(data)
}

export const useAticle = () => {
    return {
        getAllAticle,
        regfindByName,
        findAticlesByYears
    }
}
