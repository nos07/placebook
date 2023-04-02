-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'DETACHED_HOUSE');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVerification" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "homestay_pricing" (
    "id" SERIAL NOT NULL,
    "weekday" INTEGER,
    "weekend" INTEGER,
    "month" INTEGER,
    "homestayId" INTEGER NOT NULL,

    CONSTRAINT "homestay_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homestay_rules" (
    "id" SERIAL NOT NULL,
    "checkInTime" TEXT NOT NULL,
    "checkOutTime" TEXT NOT NULL,
    "smoking" BOOLEAN NOT NULL,
    "pets" BOOLEAN NOT NULL,
    "party" BOOLEAN NOT NULL,
    "payments" TEXT NOT NULL,
    "homestayId" INTEGER NOT NULL,

    CONSTRAINT "homestay_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homestay_kitchen" (
    "id" SERIAL NOT NULL,
    "inductionCooker" BOOLEAN NOT NULL,
    "gasStove" BOOLEAN NOT NULL,
    "refrigerator" BOOLEAN NOT NULL,
    "microwave" BOOLEAN NOT NULL,
    "homestayId" INTEGER NOT NULL,

    CONSTRAINT "homestay_kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homestay_facilities" (
    "id" SERIAL NOT NULL,
    "numOfBedroom" INTEGER NOT NULL,
    "numOfBathroom" INTEGER NOT NULL,
    "kitchenId" INTEGER,
    "homestayId" INTEGER NOT NULL,

    CONSTRAINT "homestay_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homestay_utilities" (
    "id" SERIAL NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "airCondition" BOOLEAN NOT NULL,
    "tivi" BOOLEAN NOT NULL,
    "elevator" BOOLEAN NOT NULL,
    "toothpaste" BOOLEAN NOT NULL,
    "bathSoap" BOOLEAN NOT NULL,
    "tissue" BOOLEAN NOT NULL,
    "bathTowel" BOOLEAN NOT NULL,
    "shampoo" BOOLEAN NOT NULL,
    "mineralWater" BOOLEAN NOT NULL,
    "washingMachine" BOOLEAN NOT NULL,
    "homestayId" INTEGER NOT NULL,

    CONSTRAINT "homestay_utilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homestay" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "coverImage" TEXT,
    "facebookLink" TEXT,
    "instagramLink" TEXT,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "propertyType" "PropertyType",
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "homestay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bar" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "coverImage" TEXT,
    "facebookLink" TEXT,
    "instagramLink" TEXT,
    "contact" TEXT,
    "description" TEXT,
    "pricing" TEXT,
    "openHour" TEXT,
    "closeHour" TEXT,
    "happyHourStart" TEXT,
    "happyHourEnd" TEXT,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "bar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "photos" TEXT[],
    "homestayId" INTEGER,
    "barId" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "comfort" DOUBLE PRECISION,
    "amenities" DOUBLE PRECISION,
    "wifi" DOUBLE PRECISION,
    "safety" DOUBLE PRECISION,
    "noisy" DOUBLE PRECISION,
    "beverage" DOUBLE PRECISION,
    "location" DOUBLE PRECISION,
    "placeType" TEXT,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserVerification_userId_key" ON "UserVerification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "homestay_pricing_homestayId_key" ON "homestay_pricing"("homestayId");

-- CreateIndex
CREATE UNIQUE INDEX "homestay_rules_homestayId_key" ON "homestay_rules"("homestayId");

-- CreateIndex
CREATE UNIQUE INDEX "homestay_kitchen_homestayId_key" ON "homestay_kitchen"("homestayId");

-- CreateIndex
CREATE UNIQUE INDEX "homestay_facilities_homestayId_key" ON "homestay_facilities"("homestayId");

-- CreateIndex
CREATE UNIQUE INDEX "homestay_utilities_homestayId_key" ON "homestay_utilities"("homestayId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_reviewId_key" ON "Rating"("reviewId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVerification" ADD CONSTRAINT "UserVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homestay_pricing" ADD CONSTRAINT "homestay_pricing_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "homestay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homestay_rules" ADD CONSTRAINT "homestay_rules_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "homestay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homestay_kitchen" ADD CONSTRAINT "homestay_kitchen_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "homestay_facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homestay_facilities" ADD CONSTRAINT "homestay_facilities_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "homestay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homestay_utilities" ADD CONSTRAINT "homestay_utilities_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "homestay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "homestay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_barId_fkey" FOREIGN KEY ("barId") REFERENCES "bar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
