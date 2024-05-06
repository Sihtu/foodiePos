-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuCatagory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,

    CONSTRAINT "MenuCatagory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuCatagoryMenu" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "MenuCatagoryId" INTEGER NOT NULL,

    CONSTRAINT "MenuCatagoryMenu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");

-- AddForeignKey
ALTER TABLE "MenuCatagoryMenu" ADD CONSTRAINT "MenuCatagoryMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCatagoryMenu" ADD CONSTRAINT "MenuCatagoryMenu_MenuCatagoryId_fkey" FOREIGN KEY ("MenuCatagoryId") REFERENCES "MenuCatagory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
