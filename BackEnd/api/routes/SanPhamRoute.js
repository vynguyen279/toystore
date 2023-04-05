const express = require('express')
const router = express.Router()
const sanPhamController = require('../controllers/SanPhamController')

router.use('/GetList', sanPhamController.getList)
router.use('/GetListType', sanPhamController.getListType)
router.use('/Insert', sanPhamController.themSp)
router.use('/Delete', sanPhamController.xoaSp)
router.use('/Update', sanPhamController.capNhatSp)
router.use('/Sale', sanPhamController.getListSale)
router.use('/Best', sanPhamController.getListBest)
router.use('/Best', sanPhamController.getListBest)
router.use('/New', sanPhamController.getListNew)

router.use('/', sanPhamController.index)


module.exports = router;