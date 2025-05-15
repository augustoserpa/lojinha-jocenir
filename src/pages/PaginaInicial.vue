<template>
  <q-page padding>
    <!-- Container vertical, cards empilhados e espaçados -->
    <div class="column items-center q-pa-md" style="max-width: 600px; margin: 0 auto">
      <!-- Cada card ocupa toda a largura do contêiner e tem q-mb-md (margin-bottom) -->
      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="inventory" size="2em" />
          <span class="text-h6 q-ml-sm">Produtos</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/produtos" />
        </q-card-actions>
      </q-card>

      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="shopping_cart" size="2em" />
          <span class="text-h6 q-ml-sm">Registrar Vendas</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/vendas" />
        </q-card-actions>
      </q-card>

      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="people" size="2em" />
          <span class="text-h6 q-ml-sm">Clientes</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/clientes" />
        </q-card-actions>
      </q-card>

      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="inventory_2" size="2em" />
          <span class="text-h6 q-ml-sm">Controle de Estoque</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/estoque" />
        </q-card-actions>
      </q-card>

      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="picture_as_pdf" size="2em" />
          <span class="text-h6 q-ml-sm">Gerar Folder/PDF</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/folder" />
        </q-card-actions>
      </q-card>

      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="assessment" size="2em" />
          <span class="text-h6 q-ml-sm">Relatórios</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/relatorios" />
        </q-card-actions>
      </q-card>

      <q-card class="menu-card full-width q-mb-md">
        <q-card-section class="row items-center">
          <q-icon name="qr_code_scanner" size="2em" />
          <span class="text-h6 q-ml-sm">Leitor de Códigos</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abrir" to="/app/leitor" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.menu-card {
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}
.menu-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.full-width {
  width: 100%;
}
</style>
