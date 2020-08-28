import csv
import requests
import json


# # demo_ecashflow_rfd_actual_yields === expenses
# with open('demo_ecashflow_rfd_actual_yields.csv', mode='r') as csv_file:
#     csv_reader = csv.DictReader(csv_file)
#     line_count = 0
#     for row in csv_reader:
#         if line_count == 0:
#             # print(f'Column names are {", ".join(row)}')
#             line_count += 1
#         # print(f'\tworks in the {row["Email Address"]}')
#         account = {
#             'ay_id': row["ay_id"],
#             'ay_id_app': row["ay_id_app"],
#             'ay_year_number': row["ay_year_number"],
#             'ay_year': row["ay_year"],
#             'ay_generate': row["ay_generate"],
#             'ay_export': row["ay_export"],
#             'ay_daa': row["ay_daa"],
#             'ay_total_days': row["ay_total_days"],
#             'ay_prorate': row["ay_prorate"],
#             'inf_cre_dt': row["inf_cre_dt"],
#             'inf_cre_usr': row["inf_cre_usr"],
#             'inf_mod_dt': row["inf_mod_dt"],
#             'inf_mod_usr': row["inf_mod_usr"],
#         }
#         line_count += 1
#         print(json.dumps(account))
#         requests.post(
#             'http://127.0.0.1:8000/v1/expenses/', data=account)
#     print(f'Processed {line_count} lines.')

# # demo_ecashflow_app_yields === Income
# with open('demo_ecashflow_app_yields.csv', mode='r') as csv_file:
#     csv_reader = csv.DictReader(csv_file)
#     line_count = 0
#     for row in csv_reader:
#         if line_count == 0:
#             # print(f'Column names are {", ".join(row)}')
#             line_count += 1
#         # print(f'\tworks in the {row["Email Address"]}')
#         account = {
#             'ay_id': row["ay_id"],
#             'ay_id_app': row["ay_id_app"],
#             'ay_year_number': row["ay_year_number"],
#             'ay_year': row["ay_year"],
#             'ay_generate': row["ay_generate"],
#             'ay_export': row["ay_export"],
#             'ay_daa': row["ay_daa"],
#             'ay_total_days': row["ay_total_days"],
#             'ay_actual_year': row["ay_actual_year"],
#             'ay_actual_generate': row["ay_actual_generate"],
#             'ay_actual_export': row["ay_actual_export"],
#             'ay_prorate': row["ay_prorate"],
#             'ay_date': row["ay_date"],
#             'inf_cre_dt': row["inf_cre_dt"],
#             'inf_cre_usr': row["inf_cre_usr"],
#             'inf_mod_dt': row["inf_mod_dt"],
#             'inf_mod_usr': row["inf_mod_usr"]
#         }
#         line_count += 1
#         print(json.dumps(account))
#         requests.post(
#             'http://127.0.0.1:8000/v1/income/', data=account)
#     print(f'Processed {line_count} lines.')


# demo_ecashflow_app_main === ecashflowam
with open('demo_ecashflow_app_main.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        account = {
            'am_id': row["am_id"],
            're_type': row["re_type"],
            're_type_text': row["re_type_text"],
            'am_ref_number': row["am_ref_number"],
            'am_tariff': row["am_tariff"],
            'am_date_fitcd': row["am_date_fitcd"],
            'am_application_status': row["am_application_status"],
            'es_description': row["es_description"],
            'district': row["district"],
            'state': row["state"],
            'am_state': row["am_state"],
            'am_district': row["am_district"],
        }
        line_count += 1
        print(json.dumps(account))
        requests.post(
            'http://127.0.0.1:8000/v1/ecashflowam/', data=account)
    print(f'Processed {line_count} lines.')

# original

# with open('air_sel.csv', mode='r') as csv_file:
#     csv_reader = csv.DictReader(csv_file)
#     line_count = 0
#     for row in csv_reader:
#         if line_count == 0:
#             # print(f'Column names are {", ".join(row)}')
#             line_count += 1
#         # print(f'\tworks in the {row["Email Address"]}')
#         account = {
#             'email': row["Email Address"],
#             'username': row["Email Address"],
#             'password1': 'airselrfid1234',
#             'password2': 'airselrfid1234'
#         }
#         line_count += 1
#         # print(json.dumps(account))
#         requests.post(
#             'https://airsel-rfid-api.pipe.my/auth/registration/', data=account)
#     print(f'Processed {line_count} lines.')
