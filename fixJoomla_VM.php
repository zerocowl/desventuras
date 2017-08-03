// Corrigindo plugins para vm3 no joomla 2.5, onde o template não pode ser atualizado

//Separe os sublayouts e encontre a var 	PRICE
//-------------------------------------------------
<?php //echo $rowsHeight[$row]['price'] ?>
			<div class="vm3pr-<?php echo $rowsHeight[$row]['price'] ?>"> <?php

 				echo shopFunctionsF::renderVmSubLayout('prices',array('product'=>$product,'currency'=>$currency));
// mostra o preco de venda
echo $product->prices['salesPrice']; ?>
//--------------------------------------------------

// layout horizontal
<div class="vm3pr-<?php echo $rowsHeight[$row]['price'] ?>">

<span id="preco_f" style="font-size: 20px;font-weight: bold;font-family: arial;margin-left: 40%;position: relative;top: -10px;"><?php echo 'R$' . number_format($product->prices['salesPrice'], 2, ',', '.');?> </span>

//alterei o /components/com_virtuemart/products.php
//no vm2 o template usa > PricesalesPrice na diva
//-----------------------------------------------------

//Instaleo vm 2.9.9, tem as mesmas tabelas do vm3, mas possui as var do vm2
//e tambem não possui sublayouts que possam interferir no template
