import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
    res.send('Home no controller');
    //res.render('pages/page');
}

export const municipios = (req: Request, res: Response) => {
    res.send('Municípios no controller');
    //res.render('pages/municipios');
}

export const vendedores = (req: Request, res: Response) => {
    res.send('Vendedores no controller');
    //res.render('pages/vendedores');
}