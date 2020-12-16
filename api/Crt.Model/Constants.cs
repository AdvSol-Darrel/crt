﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Crt.Model
{
    public static class Constants
    {
        public const string AppName = "CRT";
        public const string AuthDir = "IDIR";
        public static DateTime MaxDate = new DateTime(9999, 12, 31);
        public static DateTime MinDate = new DateTime(1900, 1, 1);
        public static decimal MaxFileSize = 2097152;
        public const string VancouverTimeZone = "America/Vancouver";
        public const string PacificTimeZone = "Pacific Standard Time";
        public const string SystemAdmin = "SYSTEM_ADMIN";
    }

    public static class ExportQuery
    {
        public const string CqlFilter = "cql_filter";
        public const string ServiceAreas = "serviceAreas";
        public const string OutputFormat = "outputFormat";
        public const string Format = "format";
        public const string TypeName = "typeName";
        public const string Layers = "layers";
        public const string FromDate = "fromDate";
        public const string ToDate = "toDate";
        public const string Count = "count";
    }

    public static class ExportQueryEndpointConfigName
    {
        public const string WFS = "WFSExportPath";
        public const string WMS = "KMLExportPath";
    }

    public static class Permissions
    {
        public const string CodeWrite = "CODE_W";
        public const string CodeRead = "CODE_R";
        public const string UserWrite = "USER_W";
        public const string UserRead = "USER_R";
        public const string RoleWrite = "ROLE_W";
        public const string RoleRead = "ROLE_R";
    }

    public static class Entities
    {
        public const string User = "user";
        public const string Role = "role";
    }

    public static class FieldTypes
    {
        public const string String = "S";
        public const string Decimal = "N";
        public const string Date = "D";
    }

    public static class Fields
    {
        public const string Username = "Username";
        public const string FirstName = "FirstName";
        public const string LastName = "LastName";
        public const string Email = "Email";
        public const string EndDate = "EndDate";

        public const string RoleId = "RoleId";
        public const string Name = "Name";
        public const string Description = "Description";

        public const string PermissionId = "PermissionId";

        public const string ApiClientId = "ApiClientId";
    }

    public class DateColNames
    {
        public const string EndDate = "END_DATE";
    }

    public static class CodeSet
    {
        public const string WrkRptMaintType = "WRK_RPT_MAINT_TYPE";
        public const string UnitOfMeasure = "UOM";
        public const string FeatureType = "FEATURE_TYPE";
    }

    public static class CrtEnvironments
    {
        public const string Dev = "DEV";
        public const string Test = "TST";
        public const string Train = "TRN";
        public const string Uat = "UAT";
        public const string Prod = "PRD";
        public const string Unknown = "UNKNOWN";
    }

    public static class DotNetEnvironments
    {
        public const string Dev = "DEVELOPMENT";
        public const string Test = "STAGING";
        public const string Train = "TRAINING";
        public const string Uat = "UAT";
        public const string Prod = "PRODUCTION";
        public const string Unknown = "UNKNOWN";
    }

    public static class FeatureType
    {
        public const string None = "None";
        public const string Point = "Point";
        public const string Line = "Line";
        public const string PointLine = "Point/Line";
    }

    /// <summary>
    /// Spatial Data
    /// None - Non-Location specific reporting Fields
    /// GPS - Location specific reporting fields(GPS)
    /// LRS - Location specific reporting (without GPS)
    /// </summary>
    public enum SpatialData
    {
        None,
        Gps,
        Lrs
    }

    public enum SpValidationResult
    {
        Success, Fail, NonSpatial
    }

    public static class GpsCoords
    {
        public const decimal MaxLongitude = -109;
        public const decimal MinLongitude = -141;
        public const decimal MaxLatitude = 62;
        public const decimal MinLatitude = 47;
    }

    public static class KeycloakMapperConfig
    {
        public const string DefaultProtocol = "openid-connect";
        public const string OidcAudienceMapper = "oidc-audience-mapper";
        public const string OidcHardcodedClaimMapper = "oidc-hardcoded-claim-mapper";
        public const string IncludedClientAudience = "included.client.audience";
        public const string IncludedCustomAudience = "included.custom.audience";
        public const string AccessTokenClaim = "access.token.claim";
        public const string ClaimName = "claim.name";
        public const string ClaimValue = "claim.value";
        public const string JsonTypeLabel = "jsonType.label";
        public const string ApiClient = "api_client";
    }

    public static class LdapAttrs
    {
        public const string SamAccountName = "sAMAccountName";
        public const string BcgovGuid = "bcgovGUID";
    }
}
