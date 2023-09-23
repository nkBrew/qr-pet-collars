from rest_framework import serializers

from ..models import Collar


class CollarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collar
        fields = (
            'img_url',
            'pet_name',
            'breed',
            'weight',
            'owner_name',
            'owner_email',
            'phone_number',
            'qr_code_id',
        )
